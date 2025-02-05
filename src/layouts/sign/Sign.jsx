import {Outlet} from 'react-router-dom'
import './Sign.scss'
import { Image, Stack } from '@chakra-ui/react'
import logo from '../../images/logo.png';

export default function Sign(){




    return(
        <div>
            <div id='login'></div>

            <Stack direction={"row"} className='container'>
                <div className='child'>
                    <div className='child-content'>
                    
                        <Image className='logo' src={logo}  alt='logo'/>
                    
                        <h2>
                            ArtUniverse
                        </h2>
                    </div>
                    <p className='commercial'>
                    Join our community today and look beyond the horizon
                    </p>
                    </div>


                <div className="sign">
                    <Outlet />
                </div>





            </Stack>
            </div>
        
    )

}