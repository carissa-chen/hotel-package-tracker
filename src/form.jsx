function Form() {
  async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData (event.currentTarget);
    const packageData = {
    recipientName: `${formData.get("firstName")} ${formData.get("lastName")}`,
    trackingNumber: formData.get("trackingNo"),
    carrier: formData.get("carrier")
    };
    
    
    try { 
    const response = await fetch("http://127.0.0.1:5000/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(packageData)
    });

    const result = await response.json();
    alert("Package logged successfully!");
    console.log(result);

    
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
      <input name= "carrier" type="text" placeholder="CARRIER" required />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;