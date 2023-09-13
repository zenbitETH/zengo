import ZengoLayout from "@/components/ZengoLayout";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import React from "react";

export default function Ceremony() {
  const { moderatorsByType } = useOnboardingContextState();

  return (
    <ZengoLayout>
      <div className="bg-mod text-center h-full items-center relative top-20">
        <div className="grid xl:grid-cols-2	">
          <div className="bg-cyan-900 mx-3 md:mx-24">asd</div>
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
                  {moderatorsByType.civil.map((mod, idx) => (
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
                  {moderatorsByType.private.map((mod, idx) => (
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
                  {moderatorsByType.academy.map((mod, idx) => (
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
                  {moderatorsByType.government.map((mod, idx) => (
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
                  {moderatorsByType.open.map((mod, idx) => (
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
}
