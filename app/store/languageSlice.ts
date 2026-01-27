import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
  // Pulse/Feedback screens
  
  // Centralized UI strings for translation
  const UI_STRINGS = {
  // Language screen
  
  // Welcome screen
  beHere: 'BE HERE',
  agreeTerms: 'I have read and agree to Presenz Terms of Use.',
  ageConfirm: 'I confirm that I am at least 16 years old.',
  
  // Welcome2 screen
  welcomeTo: 'Welcome To',
  exploreNearby: "Explore what's happening near you",
  getStarted: 'Get Started',
  
  // Login screen
  welcomePresenz: 'Welcome to PRESENZ',
  enterEmailDesc: 'Please enter your email address, so we can verify you.',
  enterEmail: 'Enter email address',
  getOtp: 'Get OTP',
  byContinuing: "By continuing, you agree to PRESENZ's",
  terms: 'Terms of Service and Privacy Policy',
  
  // Hobbies screen
  hobbies: 'Hobbies',
  hobbyArt: 'Art',
  hobbyMusic: 'Music',
  hobbyNightlife: 'Nightlife',
  hobbyCinema: 'Cinema & Media',
  hobbyTheatre: 'Theatre',
  hobbyWellness: 'Wellness',
  hobbyFestivals: 'Festivals & Events',
  hobbyOutdoor: 'Outdoor/Nature',
  hobbySports: 'Sports/Fitness',
  hobbyFood: 'Food/Drinks',
  hobbyUrban: 'Urban Moment',
  next: 'Next',
  
  // Location screen
  senseSurroundings: 'Sense your surroundings',
  locationDesc: 'PRESENZ uses your location to show moments near you. Your location is never shared with others.',
  allowLocation: 'Allow Location',
  notNow: 'Not now',
  pulseLive: 'Pulse is live now',
  contentRejected: 'Content Rejected',
  congratulations: 'Congratulations',
  contentFlagged: 'Content Flagged for violating community guidelines',
  earned: 'You have earned +{reward} $PSZ',
  goToWallet: 'Go to Wallet',
  pulseAutoDelete: 'Pulse will be automatically deleted after 48 hours',
  
  // Pulse/Loading screen
  uploading: 'Uploading',
  aiSafetyCheck: 'AI Safety Check',
  reviewingContent: 'Reviewing Content',
  detectingLandmark: 'Detecting Landmark',
  autoCategorizing: 'Auto-Categorizing',
  analyzingContent: 'Analyzing content and audio..',
  
  // Pulse/ImageSelection screen
  selectMedia: 'Please select an image or video.',
  descriptionRequired: 'Description is required.',
  mustBeLoggedIn: 'You must be logged in to upload. Please log in first.',
  locationRequired: 'Location is required.',
  locationIncomplete: 'Location data is incomplete. Please try again.',
  writeSomething: 'Write something...',
  uploadingText: 'Uploading...',
  gettingLocation: 'Getting location...',
  createPulse: 'Create Pulse',
  autoLocation: 'Auto - location',
  
  // Pulse/HistoryPulse screen
  historyPulse: 'History Pulse',
  noDescription: 'No description',
  unknownLocation: 'Unknown location',
  deletePost: 'Delete post',
  failedDelete: 'Failed to delete post',
};

// Async thunk to fetch translations from OpenAI API
export const fetchTranslations = createAsyncThunk(
    'language/fetchTranslations',
    async ({ targetLanguage }: { targetLanguage: string }) => {
        // Use OpenAI API key from environment variable
        const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
        console.log('OPENAI_API_KEY:', OPENAI_API_KEY);
        const prompt = `Translate the following UI strings to ${targetLanguage} and return as a JSON object.\n${JSON.stringify(UI_STRINGS)}`;
        const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful translator.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const data = response.data;
    console.log('OpenAI API response:', data);
    // Parse the JSON from the assistant's reply
    const text = data.choices[0].message.content;
    try {
      return JSON.parse(text);
    } catch {
      return UI_STRINGS;
    }
  }
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selected: 'English',
    translations: UI_STRINGS,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setLanguage(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.loading = false;
        state.translations = action.payload;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Translation failed';
      });
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
