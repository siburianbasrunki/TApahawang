const Button = ({link,name,className}) => {
    return (
      <>
        <a href={link}>
          <button className={className}>{name}</button>
        </a>
      </>
    );
  };
  
  export default Button