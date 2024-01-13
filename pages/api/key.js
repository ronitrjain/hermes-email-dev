import createCorporation from "@/utils/createCorporation";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { company_key, company, email } = req.body;

        console.log([company_key, company, email])
        
        try {
        const corporation = await createCorporation(company_key, company, email);
        return res.status(200).json(corporation);
        } catch (error) {
            console.log(error)
            
        return res.status(400).json({ message: error.message });
        }
    }
    }