export interface IEvidence {
  date: string;
  description: string;
  ipfsUrl: string;
}

export interface IProposalInfo {
  title: string;
  type: string;
  description: string;
}

export interface ILocation {
  gMapsLocationObject: {
    lat: number;
    lng: number;
  };
  locationText: string;
}

export interface IScanResponse {
  message: string;
  scan: boolean;
  tokenId: string;
}

export interface IClaimResponse {
  claimed: boolean;
  tokenId?: string;
  error?: string;
}

export interface IModeratorsByType {
  civil: ModeratorInfo[];
  private: ModeratorInfo[];
  academy: ModeratorInfo[];
  government: ModeratorInfo[];
  open: ModeratorInfo[];
}

export interface ModeratorInfo {
  address: string;
  shortAddress: string;
  modType: number;
  modPosition: string;
  modOrganization: string;
  modTypeTxt: string;
}

export enum ZengoOnboardingOptions {
  "moderators" = "moderators",
  "citizens" = "citizens",
  "off" = "off",
}

export enum ModeratorsTypes {
  "Organizaciones Civiles" = "Organizaciones Civiles",
  "Sector Privado" = "Sector Privado",
  "Academia" = "Academia",
  "Gobierno" = "Gobierno",
  "Moderador abierto" = "Moderador abierto",
}
