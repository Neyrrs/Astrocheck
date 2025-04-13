import image from '@/assets/Pictures/Images/CircleImage.png'
import Icons from './Icons'

const ProfileImage = (props) => {
  return (
    <>
        <Icons image={image} alt="Profile picture" className={`rounded-full ${props.size || ""}`} {...props}/>
    </>
  )
}

export default ProfileImage