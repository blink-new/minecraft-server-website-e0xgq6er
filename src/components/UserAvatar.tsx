import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src: string
  alt: string
  fallback: string
  className?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, fallback, className }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar