const API_URL = "http://localhost:8000"

export const signup = async function (details) {
    const response = await fetch(`${API_URL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })

    const data = await response.json()
    if(data.exists) {
      alert("user already exists, signing you in instead")
      return {valid: true, body: data.body}
    } else if(!data.exists) {
      console.log(data)
      return {valid: true, body: data.body}
    }

}


export const login = async function(details) {
    try {
        const response = await fetch(`${API_URL}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      })
      
      const data = await response.json()
      if(response.ok) {
        console.log(data)
        return {valid: true, body: data.user}
    } else {
        alert("Invalid login credentials try again")
        return false
        // throw new Error("Don't be scared, its my custom error")
    }
    } catch (error) {
        console.log(error)
    }
    
}