import ZengoLayout from "@/components/ZengoLayout";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { CHAIN } from "@/const/chains";
import { contractAddress_zengoDao } from "@/const/contracts";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { generateModeratorsLists } from "@/lib/generateModeratorsLists";
import type { IModeratorsByType } from "@/interfaces";

const ModsCeremonyPage = ({
  // moderatorsFormatedData,
  modsByType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { moderatorsByType } = useOnboardingContextState();

  const [modsList, setModsList] = useState<IModeratorsByType>({
    civil: [],
    private: [],
    academy: [],
    government: [],
    open: [],
  });

  useEffect(() => {
    if (
      moderatorsByType.civil.length > 0 ||
      moderatorsByType.private.length > 0 ||
      moderatorsByType.academy.length > 0 ||
      moderatorsByType.government.length > 0 ||
      moderatorsByType.open.length > 0
    ) {
      setModsList(moderatorsByType);
    } else {
      setModsList(modsByType);
    }
  }, [moderatorsByType]);

  return (
    <ZengoLayout>
      <div className="bg-mod text-center h-full items-center relative pt-10">
        <div className="grid xl:grid-cols-2	">
          <div className="bg-cyan-900 mx-3 md:mx-24">STREAM</div>
          <div>
            <h1 className="relative left-1/2 -translate-x-1/2 text-2xl font-bau text-white">
              Moderadores
            </h1>
            <div className="mx-3 md:mx-10 h-full grid gap-3  font-bau relative">
              <div
                /*Replicate this for each Mod Category*/ className="modCategory"
              >
                <div className="text-xl pb-3">Organizaciones Civiles</div>
                <div
                  /*this set 1 column for mobile, 2 columns for desktop on the same category moderators*/ className="modGrid"
                >
                  {modsList.civil.map((mod, idx) => (
                    <div className="modInfo" key={idx}>
                      <div className="col-span-4 text-center">
                        {mod.shortAddress}
                      </div>
                      <div className="col-span-8">
                        <div className="font-bau text-lg text-center">
                          {mod.modPosition}
                        </div>
                        <div className="text-sm text-center">
                          {mod.modOrganization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modCategory">
                <div className="text-xl pb-3">Sector Privado</div>
                <div className="modGrid">
                  {modsList.private.map((mod, idx) => (
                    <div className="modInfo" key={idx}>
                      <div className="col-span-4 text-center">
                        {mod.shortAddress}
                      </div>
                      <div className="col-span-8">
                        <div className="font-bau text-lg text-center">
                          {mod.modPosition}
                        </div>
                        <div className="text-sm text-center">
                          {mod.modOrganization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modCategory">
                <div className="text-xl pb-3">Academia</div>
                <div className="modGrid">
                  {modsList.academy.map((mod, idx) => (
                    <div className="modInfo" key={idx}>
                      <div className="col-span-4 text-center">
                        {mod.shortAddress}
                      </div>
                      <div className="col-span-8">
                        <div className="font-bau text-lg text-center">
                          {mod.modPosition}
                        </div>
                        <div className="text-sm text-center">
                          {mod.modOrganization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modCategory">
                <div className="text-xl pb-3">Gobierno</div>
                <div className="modGrid">
                  {modsList.government.map((mod, idx) => (
                    <div className="modInfo" key={idx}>
                      <div className="col-span-4 text-center">
                        {mod.shortAddress}
                      </div>
                      <div className="col-span-8">
                        <div className="font-bau text-lg text-center">
                          {mod.modPosition}
                        </div>
                        <div className="text-sm text-center">
                          {mod.modOrganization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modCategory">
                <div className="text-xl pb-3">Moderador Abierto</div>
                <div className="modGrid">
                  {modsList.open.map((mod, idx) => (
                    <div className="modInfo" key={idx}>
                      <div className="col-span-4 text-center">
                        {mod.shortAddress}
                      </div>
                      <div className="col-span-8">
                        <div className="font-bau text-lg text-center">
                          {mod.modPosition}
                        </div>
                        <div className="text-sm text-center">
                          {mod.modOrganization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ZengoLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  // moderatorsFormatedData: any[];
  modsByType: IModeratorsByType;
}> = async () => {
  if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID) {
    return {
      props: {
        /* moderatorsFormatedData: [], */ modsByType: {
          civil: [],
          private: [],
          academy: [],
          government: [],
          open: [],
        },
      },
    };
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY as string,
    CHAIN,
    {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID, // Use client id if using on the client side, get it from dashboard settings
      secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
    }
  );

  const contract = await sdk.getContract(contractAddress_zengoDao);

  if (contract === null) {
    return {
      props: {
        /* moderatorsFormatedData: [], */ modsByType: {
          civil: [],
          private: [],
          academy: [],
          government: [],
          open: [],
        },
      },
    };
  }

  const getModeratorsData = await contract.call("getModerators");

  const getModeratorsListData = await contract.call("getModeratorsList");

  const { /* moderatorsFormatedData, */ modsByType } = generateModeratorsLists(
    getModeratorsData,
    getModeratorsListData
  );

  return {
    props: { /* moderatorsFormatedData, */ modsByType },
  };
};

export default ModsCeremonyPage;
