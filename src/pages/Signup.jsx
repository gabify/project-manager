import { useState } from 'react';
import Header from '../components/Header'
import { usePost } from '../hooks/usePost';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [passwordType, setPasswordType] = useState('password')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {send, postLoading, postError} = usePost()
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/login')
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

        const user = {name, email, password}

        const response = await send(user, '/user/create')

        if(response.success){
            setName('')
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
                        <label htmlFor="name" className='text-xs font-medium tracking-wide mb-1.5'>
                            Name
                        </label>
                        <input 
                            type="text"
                            id='name' 
                            className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none'
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                        />
                    </div>

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
                        <button className='text-sm'>Sign up</button>
                    </div>

                    <div className={`text-xs font-light text-center mt-2`}>
                        <p>
                            Do you have an account already? Login 

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
 
export default Signup;