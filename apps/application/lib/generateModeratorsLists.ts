import { type Address } from "@thirdweb-dev/sdk";
import { ModeratorsTypes, type IModeratorsByType } from "@/interfaces";
import { shortenAddress } from "@/lib/utils";

export const generateModeratorsLists = (
  getModeratorsData: any[],
  getModeratorsListData: Address[]
): {
  // moderatorsFormatedData: any[];
  modsByType: IModeratorsByType;
} => {
  const moderatorsFormatedData: any[] = getModeratorsData.map(
    (moderator: any, idx: number) => {
      const modTypeTxt =
        moderator.moderatorType === 0
          ? ModeratorsTypes["Organizaciones Civiles"] // "Organizaciones Civiles"
          : moderator.moderatorType === 1
          ? ModeratorsTypes["Sector Privado"]
          : moderator.moderatorType === 2
          ? ModeratorsTypes["Academia"]
          : moderator.moderatorType === 3
          ? ModeratorsTypes["Gobierno"]
          : moderator.moderatorType === 4
          ? ModeratorsTypes["Moderador abierto"]
          : "No definido";
      return {
        address: getModeratorsListData[idx] || "0xAddress",
        shortAddress: shortenAddress(getModeratorsListData[idx]) || "0xAddr",
        modType: moderator.moderatorType,
        modPosition: moderator.position,
        modOrganization: moderator.organization,
        modTypeTxt,
      };
    }
  );
  const modsByType = moderatorsFormatedData.reduce(
    (acc, mod) => {
      if (mod.modType === 0) {
        acc.civil.push(mod);
      } else if (mod.modType === 1) {
        acc.private.push(mod);
      } else if (mod.modType === 2) {
        acc.academy.push(mod);
      } else if (mod.modType === 3) {
        acc.government.push(mod);
      } else if (mod.modType === 4) {
        acc.open.push(mod);
      }
      return acc;
    },
    {
      civil: [],
      private: [],
      academy: [],
      government: [],
      open: [],
    }
  );
  return {
    // moderatorsFormatedData,
    modsByType,
  };
};
