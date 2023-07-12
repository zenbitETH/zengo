export default function ProgressBar (props: any) {
    const {currentStep} = props;
    return(              
        <div>
            <div className="formProgress">
                <div className="flex ">
                    <div className="flex-1 relative">
                        <div className={currentStep === 1 ? "progressCircles bg-white/80 animate-pulse" : "progressCircles bg-none"} />
                        <div className={currentStep === 1 ? "tittleOn" : "tittleOff"}>
                            General
                        </div>
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-white/20"></div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className={currentStep === 2 ? "progressCircles bg-white/80 animate-pulse" : "progressCircles bg-none"} />
                        <div className={currentStep === 2 ? "tittleOn" : "tittleOff"}>
                            Ubicación
                        </div>
                    </div>
                    <div className="progressBar ">
                        <div className="barContainer">
                            <div className="barBar bg-white/20" ></div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className={currentStep === 3 ? "progressCircles bg-white/80 animate-pulse" : "progressCircles bg-none"} />
                        <div className={currentStep === 3 ? "tittleOn" : "tittleOff"}>
                            Evidencia
                        </div>
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-white/20"></div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className={currentStep === 4 ? "progressCircles bg-white/80 animate-pulse" : "progressCircles bg-none"} />
                        <div className={currentStep === 4 ? "tittleOn" : "tittleOff"}>
                            Confirmar
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="
                flex justify-between w-full px-6
                text-center  text-white font-exo"
            >
            </div>
        </div>
    )
}