import { getHouseRecommendation } from "@/lib/actions/house-recomendation"

export default async function Test(){
    const data = await getHouseRecommendation("یک خانه دو خوابه میخواهم")
    console.log(data)
    return (
        <div>Hellooooooooooooooooooooooooooooooo</div>
    )
}