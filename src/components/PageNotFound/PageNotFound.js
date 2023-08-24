import React from 'react'
import { NavlinkBack } from './PageNotFoundElement'

export default function PageNotFound() {
    return (
        <div>
            <section className="flex items-center h-full p-16 bg-gray-50 text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">Trang không tồn tại</p>
                        <p className="mt-4 mb-8 text-gray-600">Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</p>
                        <NavlinkBack to="/home" sty>Quay lại trang chủ</NavlinkBack>
                    </div>
                </div>
            </section>

        </div>
    )
}
