import { ICourse } from "@/data/domain/Course"
import { Box } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CourseForm() {
    const {
        control,
        handleSubmit,
        formState: { errors }
      } = useForm<ICourse>({
        
      })
    const onSubmit: SubmitHandler<ICourse> = async (data) => {

    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
        </Box>
    )
}