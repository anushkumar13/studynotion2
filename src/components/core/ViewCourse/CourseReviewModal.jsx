// imports

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"
import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"





export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)





    {/*   Ye line form ko manage karne ke liye 4 important cheezein extract kar rahi hai — register, handleSubmit, setValue, aur errors — jinka use form fields, submission, validation, aur errors handle karne ke liye hota hai.   */}

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()





    {/*   Jab component load hota hai, tab form ke courseExperience ko khaali aur courseRating ko 0 set kar dete hain taaki form fresh state me shuru ho.   */}

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    
  }, [])





    {/*   Ye function ratingChanged tab chalta hai jab user koi naya rating select karta hai (jaise 3 stars ya 5 stars click karta hai). Us time pe ye function newRating value ko form ke courseRating field me update karta hai using setValue.   */}

  const ratingChanged = (newRating) => {
    
    setValue("courseRating", newRating)
  }





    {/*   Ye ek function hai jo jab form submit hota hai, tab call hota hai. Iska kaam hai:     1). Review and rating data ko lena     2). createRating() naam ke function ko call karna (jo shayad backend API call karega)     3).    */}

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }





  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
       
       
       
       

    {/*   "Add Review"   */}

        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5"> Add Review </p>





    {/*   Cross (x) ka button   */}

          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>

        </div>





    {/*   Posting Publicly   */}

        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />

            <div className="">





    {/*   user ka full name   */} 

              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
    




    {/*   "Posting Publicly"   */}

              <p className="text-sm text-richblack-5"> Posting Publicly </p>

            </div>
          </div>




          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">





    {/*   "Add Your Experience"   */}          

              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>

              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />

              {errors.courseExperience && (
    




    /*   "Please Add Your Experience"   */

                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>

              )}
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">





    {/*   "Cancel" wala button   */}          

              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>

              <IconBtn text="Save" />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}