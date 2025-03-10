import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjectContext } from '../hooks/useProjectContext'
import { useFetch } from '../hooks/useFetch'
import { usePost } from '../hooks/usePost'

import Header from '../components/Header'
import Modal from '../components/Modal'
import Card from '../components/Card'

const Home = () => {
    const [projectName, setProjectName] = useState('')
    const [openProjectModal, setOpenProjectModal] = useState(false)
    const {projects, dispatch} = useProjectContext()
    const {get, fetchLoading, fetchError} = useFetch()
    const {send, postLoading, postError} = usePost()
    const navigate = useNavigate()


    useEffect(() =>{
        const getProjects = async() =>{
            const projects = await get('/project/')
            dispatch({type: 'SET_PROJECT', payload: projects})
        }

        getProjects()
    }, [])

    const handleSubmiProject = async(e) =>{
        e.preventDefault()
        
        const newProject = {
            projectName : projectName,
        }

        try{
            const response = await send(newProject, '/project/new')

            if(!response.success){
                throw Error('Some error occured')
            }

            dispatch({type: 'CREATE_PROJECT', payload: response.message})
            setProjectName('')
            setOpenProjectModal(false)

        }catch(error){
            console.log(error.message)
        }
    }

    const handleClick = (id, projectName) =>{
        navigate('/project', {state: {id, projectName}})
    }

    return (
        <>
            <section>
                <Header/>

                <div className={`flex items-center justify-between mb-2`}>
                    <h2  
                    className={`text-md font-semibold`}
                    >
                    List of Projects
                    </h2>

                    <button
                    className={`text-xs`}
                    onClick={() => setOpenProjectModal(true)}
                    >
                        Add New
                    </button>
                </div>

                {!projects || projects.length <= 0 ? (
                    <div className={`text-sm font-light text-center my-5`}>
                        <p>You do not have an ongoing project today.</p>
                        <p 
                            className={`cursor-pointer hover:text-blue-400`}
                            onClick={() => setOpenProjectModal(true)}
                        >
                            Add project now.
                        </p>
                    </div>
                ) : projects.map((project) =>(
                    <Card 
                        key={project._id}
                        onClick={() => handleClick(project._id, project.projectName)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className='font-semibold'>
                            {project.projectName}
                            </h3>
                        </div>
                    </Card>
                ))}
            </section>


            {/* Modal for creating projects */}
            <Modal
                open={openProjectModal}
                onClose={() => setOpenProjectModal(false)}
                >
                <form 
                    className='mb-2'
                    onSubmit={handleSubmiProject}
                >
                    <h2 className='text-sm'>What should we do today?</h2>
                    <div className='bg-gray-800'>
                        <div className="px-2 py-3 mb-1 flex flex-col">
                            <label htmlFor="projectName" className='text-xs font-medium tracking-wide mb-1.5'>Project Name</label>
                            <input 
                                type="text" 
                                className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none' 
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center'>
                        <button className='text-sm'>Add Project</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
 
export default Home;