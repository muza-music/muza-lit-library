import { create } from "zustand";

export interface TrackMetadata {
  id: string;
  fileName: string;
  songName: string;
  composer: string;
  duration: string;
  file: File;
}

export interface UploadFormData {
  albumTitle: string;
  mainArtist: string;
  bandName: string;
  recordingDate: string;
  linerNotes: string;
  otherCredits: string;
}

export interface Musician {
  name: string;
  instruments: string;
}

type UploadStore = {
  // State
  currentStep: number;
  formData: UploadFormData;
  musicians: Musician[];
  coverImage: File | null;
  audioFiles: File[];
  trackMetadata: TrackMetadata[];

  // Step navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => boolean;
  previousStep: () => void;
  validateCurrentStep: () => boolean;

  // Form data actions
  updateFormData: (field: keyof UploadFormData, value: string) => void;
  
  // Musicians actions
  updateMusician: (index: number, field: keyof Musician, value: string) => void;
  addMusician: () => void;
  removeMusician: (index: number) => void;

  // File actions
  setCoverImage: (file: File | null) => void;
  setAudioFiles: (files: File[]) => void;
  
  // Track metadata actions
  updateTrackMetadata: (trackId: string, field: keyof Omit<TrackMetadata, 'id' | 'file'>, value: string) => void;
  deleteTrack: (trackId: string) => void;
  reorderTracks: (fromIndex: number, toIndex: number) => void;
  generateTrackMetadata: (files: File[], mainArtist: string) => void;

  // Reset/cleanup
  resetUpload: () => void;
  
  // Final submission
  getUploadData: () => {
    formData: UploadFormData;
    musicians: Musician[];
    coverImage: File | null;
    trackMetadata: TrackMetadata[];
  };
};

const initialFormData: UploadFormData = {
  albumTitle: "",
  mainArtist: "",
  bandName: "",
  recordingDate: "",
  linerNotes: "",
  otherCredits: "",
};

const initialMusicians: Musician[] = [
  { name: "", instruments: "" }
];

export const useUploadStore = create<UploadStore>((set, get) => ({
  // Initial state
  currentStep: 1,
  formData: initialFormData,
  musicians: initialMusicians,
  coverImage: null,
  audioFiles: [],
  trackMetadata: [],

  // Step navigation
  setCurrentStep: (step: number) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep, validateCurrentStep } = get();
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        set({ currentStep: currentStep + 1 });
        return true;
      }
    }
    return false;
  },

  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  validateCurrentStep: () => {
    const { currentStep, formData, audioFiles, trackMetadata } = get();
    switch (currentStep) {
      case 1:
        return !!(formData.albumTitle && formData.mainArtist && audioFiles.length > 0);
      case 2:
        return trackMetadata.every(track => !!(track.songName && track.composer));
      default:
        return true;
    }
  },

  // Form data actions
  updateFormData: (field: keyof UploadFormData, value: string) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    })),

  // Musicians actions
  updateMusician: (index: number, field: keyof Musician, value: string) =>
    set((state) => ({
      musicians: state.musicians.map((musician, i) =>
        i === index ? { ...musician, [field]: value } : musician
      )
    })),

  addMusician: () =>
    set((state) => ({
      musicians: [...state.musicians, { name: "", instruments: "" }]
    })),

  removeMusician: (index: number) =>
    set((state) => ({
      musicians: state.musicians.filter((_, i) => i !== index)
    })),

  // File actions
  setCoverImage: (file: File | null) => set({ coverImage: file }),

  setAudioFiles: (files: File[]) => {
    set({ audioFiles: files });
    // Auto-generate metadata for new files
    const { trackMetadata, formData } = get();
    get().generateTrackMetadata(files, formData.mainArtist);
  },

  // Track metadata actions
  updateTrackMetadata: (trackId: string, field: keyof Omit<TrackMetadata, 'id' | 'file'>, value: string) =>
    set((state) => ({
      trackMetadata: state.trackMetadata.map(track =>
        track.id === trackId ? { ...track, [field]: value } : track
      )
    })),

  deleteTrack: (trackId: string) =>
    set((state) => {
      const trackToDelete = state.trackMetadata.find(t => t.id === trackId);
      return {
        trackMetadata: state.trackMetadata.filter(track => track.id !== trackId),
        audioFiles: state.audioFiles.filter(file => file !== trackToDelete?.file)
      };
    }),

  reorderTracks: (fromIndex: number, toIndex: number) =>
    set((state) => {
      const newTracks = [...state.trackMetadata];
      const [movedTrack] = newTracks.splice(fromIndex, 1);
      newTracks.splice(toIndex, 0, movedTrack);
      return { trackMetadata: newTracks };
    }),

  generateTrackMetadata: (files: File[], mainArtist: string) => {
    const { trackMetadata } = get();
    const existingFileNames = trackMetadata.map(track => track.fileName);
    const newFiles = files.filter(file => !existingFileNames.includes(file.name));
    
    if (newFiles.length > 0) {
      const newMetadata = newFiles.map((file, index) => ({
        id: `track-${Date.now()}-${index}`,
        fileName: file.name,
        songName: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        composer: mainArtist || "",
        duration: "0:00", // Will be calculated later
        file: file
      }));
      
      set((state) => ({
        trackMetadata: [...state.trackMetadata, ...newMetadata]
      }));
    }
  },

  // Reset/cleanup
  resetUpload: () => set({
    currentStep: 1,
    formData: initialFormData,
    musicians: initialMusicians,
    coverImage: null,
    audioFiles: [],
    trackMetadata: [],
  }),

  // Final submission
  getUploadData: () => {
    const { formData, musicians, coverImage, trackMetadata } = get();
    return {
      formData,
      musicians,
      coverImage,
      trackMetadata
    };
  },
})); 