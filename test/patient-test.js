describe('PatientListing', () => {
    it("should list and retrieve patient details", async function () {
        const Patient = await ethers.getContractFactory("Patient");
        const pat = await Patient.deploy();
        await pat.deployed()
        const contractAddress = pat.address
        //console.log(contractAddress)

        const [_, signer] = await ethers.getSigners()
        const senderAddress = await signer.address
        await pat.listNewPatient(senderAddress, ".xyz", "Joss Sticks", 69, "liver", "c+");
        await pat.listNewPatient(senderAddress, ".yzo", "Desmond Eagle", 99, "Kidney", "b+");
        await pat.listNewPatient(senderAddress, ".yya", "Alan Wake", 73, "heart", "d+");


        console.log(Number(await pat.getPatientCount()))
        console.log(await pat.getAllAddress())
        console.log(await pat.getAllPatients())
        await pat.organReceived(1)
        await pat.organReceived(2)
        console.log(await pat.getAllPatients())
        console.log(await pat.getAllRecords())

    })
})