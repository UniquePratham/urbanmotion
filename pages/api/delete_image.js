export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const publicId = req.body.public_id;

        if (!publicId) {
            return res.status(400).json({ error: "public_id is required" });
        }

        const credentials = Buffer.from(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`).toString("base64");

        const formData = new URLSearchParams();
        formData.append("public_ids[]", publicId);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                    body: formData,
                }
            );

            const result = await response.json();

            if (response.ok) {
                res.status(200).json(result);
            } else {
                res.status(response.status).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: "Something went wrong: " + error.message });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
