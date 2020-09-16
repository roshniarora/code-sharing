import React from 'react';
import './home.css';
import Login from '../auth/Login';
import Agendas from '../rooms/Agendas';

const Home = (props) => {
  return (
    // <div className='container-fluid'>
    //   <div className='main__container'>
    //     <div className='left'>
    //       <div>
    //         <div className='text-center'>
    //           <h1 className='mb-4'> Welcome to the code sharing platform</h1>

    //           <img src='download.png' width='510' height='510'></img>
    //         </div>
    //       </div>
    //     </div>

    //     {/* <div className='right'>
    //       <h1>Right</h1>
    //     </div> */}
    //   </div>
    // </div>

    <div>
      <div>
        <div className='text-center'>
          <h1 className='mb-4'> Welcome to the code sharing platform</h1>

          <img src='download.png' width='900' height='600'></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
