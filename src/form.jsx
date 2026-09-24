function Form() {
  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData (event.currentTarget);
    const packageData = {
    recipientName: `${formData.get("firstName")} ${formData.get("lastName")}`,
    trackingNumber: formData.get("trackingNo")
    };
    
    
    try { 
    const response = await fetch("http://localhost:5000/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(packageData)
    });

    const result = await response.json();

    } catch (error) {
      alert("Could not connect to the server.");
      console.error(error);
    } 
  }

  return (

    <form className="simple-form" onSubmit={handleSubmit}>
      <h2>LOG A PACKAGE</h2>

      <input name= "firstName" type="text" placeholder="FIRST NAME" required />
      <input name= "lastName" type="text" placeholder="LAST NAME" required />
      <input name= "trackingNo" type="text" placeholder="TRACKING NUMBER" required />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;