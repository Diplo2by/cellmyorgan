describe.only('PatientListing', () => { it ("should list and retrieve patient details",async function () {
    const Patient =await ethers.getContractFactory("Patient");
    const pat = await Patient.deploy();
    await pat.deployed()
    const contractAddress = pat.address
    console.log(contractAddress)

    let count = await pat.getPatientCount();
    console.log(Number(count));
    
}) })