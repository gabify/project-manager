import { useState } from 'react'
import { usePost } from '../hooks/usePost'

import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [passwordType, setPasswordType] = useState('password')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {send, postLoading, postError} = usePost()
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/signup')
    }

    const handleChange = () =>{
        if(passwordType === 'password'){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const user = {email, password}

        const response = await send(user, '/user/login')

        if(response.success){
            setEmail('')
            setPassword('')
            console.log(response.message)
        }
    }


    return ( 
        <>
            <section>
                <Header />

                <form 
                    className='my-10 bg-gray-800 py-4 px-1 rounded-md'
                    onSubmit={handleSubmit}
                >

                    <div className="p-2 flex flex-col">
                        <label htmlFor="email" className='text-xs font-medium tracking-wide mb-1.5'>
                            Email
                        </label>
                        <input 
                            type="email"
                            id='email' 
                            className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}

                        />
                    </div>

                    <div className="p-2 flex flex-col">
                        <label htmlFor="password" className='text-xs font-medium tracking-wide mb-1.5'>
                            Password
                        </label>
                        <input 
                            type={passwordType}
                            id='password' 
                            className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none'
                            placeholder='Password should be atleast 8 character'
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="p-2 flex flex-row-reverse items-baseline justify-self-start gap-1 mb-1.5">
                        <label htmlFor="changePasswordType" className='text-xs font-medium tracking-wide'>
                            Show password
                        </label>
                        <input 
                            type="checkbox"
                            id='changePasswordType' 
                            className=''
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='flex justify-center'>
                        <button className='text-sm'>Login</button>
                    </div>

                    <div className={`text-xs font-light text-center mt-2`}>
                        <p>
                            You don`t have an account? Create your free account

                            <span 
                                className={`cursor-pointer hover:text-blue-400 ms-1`}
                                onClick={handleClick}
                            >
                                here!
                            </span>

                        </p>
                        
                    </div>
                </form>
            </section>
        </>
     );
}
 
export default Login;