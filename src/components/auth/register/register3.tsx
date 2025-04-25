import { Input } from 'antd'
import React from 'react'
import InputAuth from '../Items/InputAuth'
import WelcomeTitle from '../Items/WelcomeTitle'
import Button from '../Items/Button'
import { getTranslations } from 'next-intl/server'

async function Register3() {
    const t = await getTranslations("Auth");
    return (
        <div className='max-[1300px]:w-[80%] max-[600px]:w-[100%]  max-[1300px]:justify-center:w-full my-auto w-[390px] flex flex-wrap flex-col gap-[32px]'>
            <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc3")} />
            <div className='flex flex-col flex-wrap gap-[24px]'>
                <InputAuth name={t("")} placeHolder={t("")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                } />
                <InputAuth name={t("")} placeHolder={t("")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z" stroke="black" strokeWidth="1.5" />
                    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 15.49V15.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15.49V15.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 15.49V15.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                } />
                <InputAuth name={t("")} placeHolder={t("")} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4082 16.6677C13.4082 16.6677 14.0332 16.6677 14.6582 18.001C14.6582 18.001 16.6435 14.6677 18.4082 14.001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.9434 7.00098H16.9524" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9434 7.00098H11.9524" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.94336 7.00098H6.95234" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.89193 11.968H5.00845C3.34693 11.968 2 10.6249 2 8.96802V4.99805C2 3.34119 3.34693 1.99805 5.00845 1.99805H18.9916C20.6531 1.99805 22 3.34119 22 4.99805V9.12895" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.9996 16.001C21.9996 12.6873 19.3057 10.001 15.9827 10.001C12.6597 10.001 9.96582 12.6873 9.96582 16.001C9.96582 19.3147 12.6597 22.001 15.9827 22.001C19.3057 22.001 21.9996 19.3147 21.9996 16.001Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                } />
                <Button text={t("")} />
            </div>
        </div>
    )
}

export default Register3