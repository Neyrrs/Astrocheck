import image from '../../../assets/Pictures/image.png'
import Icons from './Icons'

const ProfileImage = (props) => {
  return (
    <>
        <Icons image={image} alt="Profile picture" className='rounded-full' {...props}/>
    </>
  )
}

export default ProfileImage