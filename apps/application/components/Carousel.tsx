"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Section {
  id: number;
  title: string;
}

const sections: Section[] = [
  { id: 1, title: "Home" },
  { id: 2, title: "Problem" },
  { id: 3, title: "Zengo Model" },
  { id: 4, title: "Zengo Roles" },
  { id: 5, title: "Verification" },
];

const Carousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  const goToPrevious = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection.id
    );
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection.id
    );
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  return (
    <div className="overflow-hidden text-center h-full grid items-center xl:mx-28 relative">
      {activeSection.id === 1 && (
        // <div className="md:mx-20 gap-3 font-bau md:h-[30rem] h-[16rem] md:h-[40rem] grid items-center py-5 px-3"> // DEV_NOTE: original line
        <div className="mx-auto gap-3 font-bau  grid items-center py-5 px-3">
          <iframe
            className="h-[16rem] md:h-[720px] xl:w-[1280px] rounded-dd"
            src="https://www.youtube.com/embed/G7e5jdp9mhc"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video player"
          />
        </div>
      )}
      {activeSection.id === 2 && (
        <div className="mx-3 py-24 gap-5 h-full grid items-center grid-cols-2 text-white font-exo overflow-y-auto hide-scrollbar">
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1">
            <div className="text-3xl font-bau text-left mb-3">
              Descripción General
            </div>
            <div className="text-sm md:text-base text-justify">
              Zengo: Presupuesto descentralizado es una aplicación colaborativa
              que impulsa la transparencia en la gobernanza urbana mediante el
              uso de software de código abierto y tecnologías descentralizadas.
              Nuestra plataforma permite la participación ciudadana a través del
              registro de propuestas que abordan las necesidades reales de la
              comunidad, y cuenta con un presupuesto descentralizado que se
              asigna a dichas propuestas por votación plural.
              <br />
              <br />
              En zengo, valoramos dar voz a los ciudadanos en la toma de
              decisiones sobre el presupuesto público. Nuestra plataforma web
              participativa y transparente facilita la generación, verificación,
              financiamiento, seguimiento y gestión de propuestas públicas,
              donde ciudadanos, representantes gubernamentales y otros actores
              colaboran para abordar y resolver las necesidades en los espacios
              públicos.
              <br />
              <br />
              Nuestra misión es promover la transparencia y fortalecer la
              participación ciudadana en la asignación y uso de los recursos
              públicos, empoderando a los ciudadanos y promoviendo una gestión
              pública equitativa y eficiente, basada en las necesidades reales
              de los espacios urbanos.
              <br />
              <br />
              Como visión, aspiramos a ser un referente en la transformación de
              la gestión pública, impulsando la transparencia, la participación
              ciudadana y la rendición de cuentas en la asignación y uso del
              presupuesto descentralizado como un bien público de gobernanza
              urbana. Nuestro objetivo es promover una gestión pública que
              refleje los valores de transparencia, participación ciudadana,
              equidad, colaboración y mejora de la calidad de vida de la
              comunidad.
            </div>
          </div>
          <div className="h-full grid grid-rows-2 gap-5 col-span-2 md:col-span-1">
            <div className="bg-black/20 rounded-dd h-full p-5 ">
              <div className="text-3xl font-bau text-left mb-2">
                Usuarios zengo
              </div>
              <div className="text-sm md:text-base text-justify pb-3">
                En zengo, los usuarios tienen la posibilidad de adoptar uno de
                los tres roles disponibles en la aplicación, cada uno de los
                cuales contribuye en distintas etapas de los ciclos de
                gobernanza y cuenta con funciones específicas.
              </div>
              <div className="pt-3 ">
                <Image
                  src={"/assets/car1.png"}
                  height={120}
                  width={512}
                  alt="Usuarios zengo"
                  className="mx-auto"
                ></Image>
              </div>
            </div>
            <div className="bg-black/20 rounded-dd h-full p-5">
              <div className="text-3xl font-bau text-left mb-3">
                Modelo zengo
              </div>
              <div className="text-sm md:text-base text-justify mb-2">
                En zengo, seguimos un enfoque de ciclos de gobernanza abiertos,
                en los cuales ciudadanos y representantes de los sectores
                público y privado colaboran en las cuatro etapas que componen
                cada ciclo.
              </div>
              <div className="grid items-center pt-10">
                <Image
                  src={"/assets/car2.png"}
                  height={120}
                  width={512}
                  alt="Usuarios zengo"
                  className="mx-auto"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSection.id === 3 && (
        <div className="mx-3 py-24 gap-5 h-full grid items-center grid-cols-2 text-white font-exo overflow-y-auto hide-scrollbar">
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1  grid">
            <div className="text-3xl font-bau text-left mb-2">
              Usuarios de Zengo
            </div>
            <div className="">
              <Image
                src={"/assets/car3.png"}
                height={220}
                width={522}
                alt="Usuarios zengo"
                className="mx-auto"
              ></Image>
            </div>
          </div>
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1 ">
            <div className="text-3xl font-bau text-left mb-2 ">
              Desarrolladores
            </div>
            <div className="text-sm md:text-base text-justify">
              Zengo es un bien público desarrollado con software de código
              abierto y tecnologías descentralizadas. Esto permite que su código
              sea copiado o modificado por cualquier usuario. Además del equipo
              de zengo, otras organizaciones o equipos de desarrolladores pueden
              utilizarlo para organizar sus propias rondas de gobernanza o
              añadir funciones adicionales.
              <br />
              <br />
              Este enfoque fomenta la Investigación y Desarrollo Colectivo
              (I+D+C), acelerando el desarrollo a través del enfoque del código
              abierto y asegurando la sustentabilidad mediante mecanismos de
              fondeo para bienes públicos en las tecnologías descentralizadas.
            </div>
          </div>
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1 ">
            <div className="text-3xl font-bau text-left mb-2 ">
              Público en general
            </div>
            <div className="text-sm md:text-base text-justify">
              Los ciclos de gobernanza en zengo comienzan a partir de propuestas
              realizadas en la plataforma. Cualquier usuario que se conecte a la
              aplicación puede ingresar propuestas a través de una dirección de
              ether. El uso de ether garantiza la privacidad de los usuarios, ya
              que no se requiere ningún dato personal, número telefónico y/o
              correo electrónico.
              <br />
              <br />
              Si ya tienes una dirección en ether, puedes crear propuestas en
              cualquier momento. En caso de no tener una dirección y querer
              generar una, puedes consultar el tutorial en go.zenbit.mx o
              participar en una de nuestras sesiones virtuales o presenciales
              organizadas por el equipo de zengo.
            </div>
          </div>
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1 ">
            <div className="text-3xl font-bau text-left mb-2 ">Moderadores</div>
            <div className="text-sm md:text-base text-justify">
              En zengo, reconocemos la importancia de garantizar la veracidad y
              confiabilidad de las propuestas de gobernanza urbana. Por esta
              razón, contamos con representantes de diferentes sectores de la
              sociedad que desempeñan el rol de moderadores. Estos moderadores
              son responsables de los procesos de confirmación y seguimiento.
              <br />
              <br />
              Cualquier representante interesado puede participar en las
              ceremonias virtuales o presenciales en las que se registran o
              retiran a los moderadores. Zengo ha establecido cinco categorías
              de representantes que desempeñan esta función de moderación,
              seleccionados según su adscripción o sus funciones.
            </div>
          </div>
        </div>
      )}
      {activeSection.id === 4 && (
        <div className="mx-3 py-24 gap-5 h-full grid items-center grid-cols-2 text-white font-exo overflow-y-auto hide-scrollbar">
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1  grid">
            <div className="text-3xl font-bau text-left mb-2">Modelo Zengo</div>
            <div className="text-sm md:text-base text-justify mb-2 h-full">
              Zengo cuenta con un modelo que combina diversas tecnologías para
              automatizar y descentralizar el proceso de gobernanza. Este
              proceso se divide en ciclos que constan de cuatro etapas, en las
              cuales los participantes desempeñan un papel clave en la
              coordinación de la gobernanza a nivel municipal, estatal o
              nacional, así como en la distribución y seguimiento del
              presupuesto descentralizado.
              <br />
              <br />
              En esta página, se proporciona una visión general de cada una de
              las etapas de los ciclos de gobernanza en Zengo. Durante estas
              etapas, los ciudadanos, los moderadores y el equipo de Zenbit
              participan activamente. En las siguientes páginas, se presentan
              imágenes que representan de forma clara el proceso de gobernanza,
              lo que te permitirá entender cómo evoluciona cada propuesta.
            </div>
          </div>
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2 md:col-span-1 ">
            <div className="text-3xl font-bau text-left mb-2 ">
              Vista general del ciclo
            </div>
            <div className="pt-16">
              <Image
                src={"/assets/car2.png"}
                height={150}
                width={640}
                alt="Usuarios zengo"
                className="m-auto"
              ></Image>
            </div>
          </div>
          <div className="bg-black/20 rounded-dd h-full p-5 col-span-2">
            <div className="text-3xl font-bau text-left mb-2">
              Estapas del ciclo de gobernanza
            </div>
            <div className="grid md:grid-cols-3">
              <div>
                <Image
                  src={"/assets/car4.png"}
                  height={235}
                  width={303}
                  alt="Usuarios zengo"
                  className="m-auto"
                ></Image>
              </div>
              <div>
                <Image
                  src={"/assets/car5.png"}
                  height={317}
                  width={690}
                  alt="Usuarios zengo"
                  className="m-auto"
                ></Image>
              </div>
              <div>
                <Image
                  src={"/assets/car6.png"}
                  height={235}
                  width={349}
                  alt="Usuarios zengo"
                  className="m-auto"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSection.id === 5 && (
        <div className="mx-3 md:mx-96 py-24 gap-5 h-full grid items-center text-white font-exo overflow-y-auto hide-scrollbar">
          <div>
            <Image
              src={"/assets/car7.png"}
              height={194}
              width={697}
              alt="Usuarios zengo"
              className="m-auto"
            ></Image>
          </div>
          <div className="md:text-2xl text-justify h-full">
            Zengo fue desarrollado por Zenbit.eth un laboratorio digital de
            bienes públicos para entornos urbanos. Todo el código es de licencia
            libre y puede ser copiado o modificado sin restricciones.
            <br />
            <br />
            Zenbit.eth solo se hace responsable del contenido y transacciones
            publicadas en la plataforma Zengo.
          </div>
          <div className="text-2xl grid grid-cols-2 mb-2 h-full">
            <div className="col-span-2 text-3xl font-bau">Presentan</div>
            <div className="font-bau">
              Maggie Hernandez
              <div className="font-exo text-base">
                <div>Diseño y gestión de PI</div>
                <div>maggie@zenbit.mx</div>
              </div>
            </div>
            <div className="font-bau">
              Habacuc Vera
              <div className="font-exo text-base">
                <div>Investigación y Desarrollo</div>
                <div>habacuc@zenbit.mx</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSection.id !== 1 ? (
        <button
          className="carBT bottom-3 md:top-0 left-3 "
          onClick={goToPrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />{" "}
          </svg>
        </button>
      ) : null}
      {activeSection.id !== 5 ? (
        <button className="carBT bottom-3 md:top-0 right-3" onClick={goToNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default Carousel;
