export default function Ceremony () {
    
    return(
        <div className="bg-mod text-center h-full grid items-center py-20 relative">
            <div className="fixed top-7 left-1/2 -translate-x-1/2 text-2xl font-bau text-white">Moderadores</div>
            <div className="modBT">Registrarse</div>
            <div className="card1">
                <div className="rounded-dd p-3 text-white bg-white/20 relative">
                    <div className="text-xl pb-3">Organizaciones Civiles</div> 
                    <div className="modGrid">
                        <div className="modInfo">
                            <div>1.</div>
                            <div className="col-span-5">Representante</div>
                            <div className="col-span-6">Gobierno de Nuevo Leon</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-dd p-3 text-white bg-white/20">
                    <div className="text-xl pb-3">Sector Privado</div> 

                </div>
                <div className="rounded-dd p-3 text-white bg-white/20">
                    <div className="text-xl pb-3">Academia</div> 

                </div>
                <div className="rounded-dd p-3 text-white bg-white/20">
                    <div className="text-xl pb-3">Gobierno</div> 
                </div>
                <div className="rounded-dd p-3 text-white bg-white/20">
                    <div className="text-xl pb-3">Moderador Abierto</div> 
                </div>
            </div>
            
        </div>
    )
}