import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TrackMetadata } from "~/appData/uploadStore";
import MuzaIcon from "~/icons/MuzaIcon";
import WaveAnimation from "~/components/ui/WaveAnimation";
import "./UploadStepTwo.scss";

interface UploadStepTwoProps {
  trackMetadata: TrackMetadata[];
  onTrackMetadataChange: (
    trackId: string,
    field: keyof Omit<TrackMetadata, "id" | "file">,
    value: string,
  ) => void;
  onDeleteTrack: (trackId: string) => void;
  onReorderTracks: (fromIndex: number, toIndex: number) => void;
}

interface PlaybackState {
  currentTrackId: string | null;
  isPlaying: boolean;
}

interface SortableTrackRowProps {
  track: TrackMetadata;
  index: number;
  onTrackMetadataChange: (
    trackId: string,
    field: keyof Omit<TrackMetadata, "id" | "file">,
    value: string,
  ) => void;
  onDeleteTrack: (trackId: string) => void;
  playbackState: PlaybackState;
  onPlayPause: (trackId: string) => void;
}

const SortableTrackRow: React.FC<SortableTrackRowProps> = ({
  track,
  index,
  onTrackMetadataChange,
  onDeleteTrack,
  playbackState,
  onPlayPause,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderPlayButton = () => {
    const isCurrentTrack = playbackState.currentTrackId === track.id;
    const isPlaying = isCurrentTrack && playbackState.isPlaying;

    if (isPlaying && isHovered) {
      return <MuzaIcon iconName="pause" />;
    }
    if (isPlaying) {
      return <WaveAnimation />;
    }
    return <MuzaIcon iconName="play" />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`table-row ${isDragging ? "dragging" : ""}`}
    >
      {/* Track Number & Drag Handle */}
      <div className="cell-number">
        <button className="drag-handle" {...attributes} {...listeners}>
          <MuzaIcon iconName="grip-vertical" />
        </button>
        <span className="track-number">{index + 1}</span>
      </div>

      {/* File Name with Play Button */}
      <div className="cell-filename">
        <button 
          className="play-button"
          onClick={() => onPlayPause(track.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderPlayButton()}
        </button>
        <span className="filename" title={track.fileName}>
          {track.fileName}
        </span>
      </div>

      {/* Editable Song Name */}
      <div className="cell-songname">
        <input
          type="text"
          value={track.songName}
          onChange={(e) =>
            onTrackMetadataChange(track.id, "songName", e.target.value)
          }
          className="editable-field"
          placeholder="Song Name"
        />
      </div>

      {/* Editable Composer */}
      <div className="cell-composer">
        <input
          type="text"
          value={track.composer}
          onChange={(e) =>
            onTrackMetadataChange(track.id, "composer", e.target.value)
          }
          className="editable-field"
          placeholder="Composer"
        />
      </div>

      {/* Duration (Read-only) */}
      <div className="cell-time">
        <span className="duration">{track.duration}</span>
      </div>

      {/* Delete Button */}
      <div className="cell-actions">
        <button
          className="delete-button"
          onClick={() => onDeleteTrack(track.id)}
          title="Delete track"
        >
          <MuzaIcon iconName="trash" />
        </button>
      </div>
    </div>
  );
};

const UploadStepTwo: React.FC<UploadStepTwoProps> = ({
  trackMetadata,
  onTrackMetadataChange,
  onDeleteTrack,
  onReorderTracks,
}) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentTrackId: null,
    isPlaying: false,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handlePlayPause = (trackId: string) => {
    const track = trackMetadata.find((t) => t.id === trackId);
    if (!track) return;

    if (playbackState.currentTrackId === trackId && playbackState.isPlaying) {
      // Pause current track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaybackState({ currentTrackId: trackId, isPlaying: false });
    } else {
      // Play new track or resume
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Create audio element for the track file
      const audio = new Audio();
      audio.src = URL.createObjectURL(track.file);
      audioRef.current = audio;
      
      audio.play().then(() => {
        setPlaybackState({ currentTrackId: trackId, isPlaying: true });
      }).catch((error) => {
        console.error("Error playing audio:", error);
      });

      // Handle audio end
      audio.addEventListener('ended', () => {
        setPlaybackState({ currentTrackId: null, isPlaying: false });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = trackMetadata.findIndex(
        (track) => track.id === active.id,
      );
      const newIndex = trackMetadata.findIndex(
        (track) => track.id === over?.id,
      );

      onReorderTracks(oldIndex, newIndex);
    }
  };

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="upload-step-two">
      <div className="metadata-table">
        {/* Table Header */}
        <div className="table-header">
          <div className="column-number"></div>
          <div className="column-filename">File Name (Not displayed)</div>
          <div className="column-songname">Song Name</div>
          <div className="column-composer">Composer</div>
          <div className="column-time">Time</div>
          <div className="column-actions"></div>
        </div>

        {/* Table Body with Drag and Drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={trackMetadata.map((track) => track.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="table-body">
              {trackMetadata.map((track, index) => (
                <SortableTrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  onTrackMetadataChange={onTrackMetadataChange}
                  onDeleteTrack={onDeleteTrack}
                  playbackState={playbackState}
                  onPlayPause={handlePlayPause}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Empty State */}
        {trackMetadata.length === 0 && (
          <div className="empty-state">
            <p>No tracks uploaded yet. Please go back to upload audio files.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadStepTwo;
