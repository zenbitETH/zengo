export default function ProgressBar (props: any) {
    const {currentStep} = props;
    return(              
        <div>
            <div className="formProgress">
                <div className="flex ">
                    <div className="flex-1">
                        <div className={currentStep === 1 ? "progressCircles bg-cit animate-pulse" : "progressCircles bg-none"} />
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-white/20"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                    <div className={currentStep === 2 ? "progressCircles bg-cit animate-pulse" : "progressCircles bg-none"} />
                    </div>
                    <div className="progressBar ">
                        <div className="barContainer">
                            <div className="barBar bg-white/20" ></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className={currentStep === 3 ? "progressCircles bg-cit animate-pulse" : "progressCircles bg-none"} />
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-white/20"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className={currentStep === 4 ? "progressCircles bg-cit animate-pulse" : "progressCircles bg-none"} />
                    </div>
                </div>
            </div>
            <div className="
                grid mx-auto w-2/3 px-6 grid-cols-4 
                text-center  text-white font-exo"
            >

                <div className={currentStep === 1 ? "font-bold underline underline-offset-4" : ""}>
                    General
                </div>

                <div className={currentStep === 2 ? "font-bold underline underline-offset-4" : ""}>
                    Ubicación
                </div>

                <div className={currentStep === 3 ? "font-bold underline underline-offset-4" : ""}>
                    Evidencia
                </div>

                <div className={currentStep === 4 ? "font-bold underline underline-offset-4" : ""}>
                    Confirmar
                </div>
            </div>
        </div>
    )
}