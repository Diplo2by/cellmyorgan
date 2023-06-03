describe.only('PatientListing', () => {
    it("should list and retrieve patient details", async function () {
        const Patient = await ethers.getContractFactory("Patient");
        const pat = await Patient.deploy();
        await pat.deployed()
        const contractAddress = pat.address
        //console.log(contractAddress)

        const [_,signer] = await ethers.getSigners()
        const senderAddress= await signer.address
        await pat.listNewPatient(senderAddress, ".xyz", "Gopi", 69);
        
        console.log(Number(await pat.getPatientCount()))
        console.log(await pat.getAllAddress())
        console.log(await pat.getAllPatients())

    })
})