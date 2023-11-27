"use client" 
import Image from "next/image"
import { useState } from "react"
import type { TransportasiLaut } from "@prisma/client"
interface TranportData {
    nama : string;
    harga : string;
    gambar : string;
}

interface formTranportBookingProps {
    selectedTransport : TranportData | null;
}

const FormTranportBooking: React.FC<formTranportBookingProps> = ({selectedTransport}) => {



    return (

        <div></div>
    )
}

export default FormTranportBooking;