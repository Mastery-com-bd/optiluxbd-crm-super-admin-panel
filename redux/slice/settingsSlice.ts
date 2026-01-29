import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TBranding = {
  id: number | null;
  siteName: string | null;
  siteDescription: string | null;

  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  backgroundColor: string | null;
  sidebarColor: string | null;

  logoUrl: string | null;
  logoPublicId: string | null;
  faviconUrl: string | null;
  faviconPublicId: string | null;

  fontFamily: string | null;

  metaDescription: string | null;
  privacyPolicyUrl: string | null;
  termsUrl: string | null;

  supportEmail: string | null;
  supportPhone: string | null;

  updatedAt: string | null;
};

const initialState: TBranding = {
  id: null,
  siteName: null,
  siteDescription: null,

  primaryColor: null,
  secondaryColor: null,
  accentColor: null,
  backgroundColor: null,
  sidebarColor: null,

  logoUrl: null,
  logoPublicId: null,
  faviconUrl: null,
  faviconPublicId: null,

  fontFamily: null,

  metaDescription: null,
  privacyPolicyUrl: null,
  termsUrl: null,

  supportEmail: null,
  supportPhone: null,

  updatedAt: null,
};

const brandingSlice = createSlice({
  name: "branding",
  initialState,
  reducers: {
    /** Set full branding object (API response) */
    setBranding: (state, action: PayloadAction<TBranding>) => {
      return { ...state, ...action.payload };
    },

    /** Update single field dynamically */
    updateBrandingField: <K extends keyof TBranding>(
      state: TBranding,
      action: PayloadAction<{ key: K; value: TBranding[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },

    /** Reset branding */
    resetBranding: () => initialState,
  },
});

export const { setBranding, updateBrandingField, resetBranding } =
  brandingSlice.actions;

export default brandingSlice.reducer;

export const currentBrand = (state: RootState) => state.settings;
