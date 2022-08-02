import React from 'react'

const Catcard = ({fetchedData}) => {
    let display 
    console.log(fetchedData)
    display = fetchedData.map(x => {
        const {id,name,adaptability,affection_level,child_friendly,description,dog_friendly,energy_level,
            experimental,hairless,health_issues,hypoallergenic,image} = x 
            return (<>
                <h1>{name}</h1>
                {/* <img src={image?.url} alt="" /> */}
                </>
            )

    })
  return (
    <div style={{width: '200px',height: 'auto'}}>


    {display}


    </div>
  )
}

export default Catcard