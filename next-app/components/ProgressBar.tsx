export default function ProgressBar (props: any) {
    const {currentStep} = props;
    return(              
        <div>
            <div className="formProgress">
                <div className="flex ">
                    <div className="flex-1">
                        <div className="progressCircles bg-gray-300" />
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="progressCircles bg-gray-300" />
                    </div>
                    <div className="progressBar ">
                        <div className="barContainer">
                            <div className="barBar bg-gray-300" ></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="progressCircles bg-gray-300" />
                    </div>
                    <div className="progressBar">
                        <div className="barContainer">
                            <div className="barBar bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="progressCircles bg-gray-300" />
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
                    Location
                </div>

                <div className={currentStep === 3 ? "font-bold underline underline-offset-4" : ""}>
                    Evidence
                </div>

                <div className={currentStep === 4 ? "font-bold underline underline-offset-4" : ""}>
                    Confirm
                </div>
            </div>
        </div>
    )
}