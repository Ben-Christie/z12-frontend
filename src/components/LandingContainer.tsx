// Icons by @fontawesome - https://fontawesome.com
import { FaStopwatch, FaMedal, FaChartLine } from 'react-icons/fa';

function LandingContainer() {
  // this component is used to display the paragraphs on the landing page
  const createBodyComponent = (title: string, paragraph: string, icon: JSX.Element) => {
    return (
      <div className="w-full h-full block px-5 pt-2 border-x-4">
        <div id="component-title" className="text-2xl text-bold pb-1 block text-center">
          <div id='icon' className="flex justify-center text-5xl pb-2">{icon}</div>
          {title}
        </div>
        <div className="text-lg text-justify">
          {paragraph}
        </div>
      </div>
    );
  };

  return (
    <div className="w-3/5 h-4/5 bg-z12-gray rounded-xl shadow-standard block bg-opacity-80">
      <div
        id="title"
        className="h-1/5 w-full rounded-tr-[12px] rounded-tl-[12px] text-white p-3 flex items-center font-bold text-5xl shadow-shallow justify-center"
      >
        Z12 Performance
      </div>

      <div
        id="body"
        className="h-4/5 w-full rounded-br-[12px] rounded-bl-[12px] text-white p-3 items-center justify-center font-bold text-xl grid grid-cols-3"
      >
        {createBodyComponent(
          'Time',
          'The Z12 performance app places essential training data, a network of knowledge and access to a cohort of program-strengthening recruits at a coach’s fingertips, maximizing their time and energy.',
          <FaStopwatch />
        )}

        {createBodyComponent(
          'Talent',
          'A key element of being a coach is building strong programs, Z12 Performance puts coaches in prime position to attract and recruit the right and often hidden talent. Furthermore, once recruited, our app enables coaches to ensure that talent is not wasted.',
          <FaMedal />
        )}

        {createBodyComponent(
          'Knowledge',
          'Look beyond one-off results and into key training, physiological and biometric data on athletes.',
          <FaChartLine />
        )}
      </div>
    </div>
  );
}

export default LandingContainer;
