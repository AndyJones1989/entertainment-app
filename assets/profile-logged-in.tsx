
const ProfileAuthSVG = () => {
  return(
<svg 
	version="1.1" 
	xmlns="http://www.w3.org/2000/svg" 
	xmlnsXlink="http://www.w3.org/1999/xlink" 
	width="60" 
	height="60"
	fill="green">

  <title>Abstract user icon</title>

  <defs>
    <clipPath id="circular-border">
      <circle cx="30" cy="30" r="28" />
    </clipPath>
    <clipPath id="avoid-antialiasing-bugs">
	  <rect width="100%" height="49" />
    </clipPath>
  </defs>
  
  <circle cx="30" cy="30" r="28" fill="black" clipPath="url(#avoid-antialiasing-bugs)" />
  <circle cx="30" cy="23" r="11" />
  <circle cx="30" cy="55" r="20" clipPath="url(#circular-border)" />
</svg>);
}
export default ProfileAuthSVG;