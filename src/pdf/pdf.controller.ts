import { Controller, Get } from "@nestjs/common";

@Controller("pdf")
export class PdfController {
    @Get('/')
    getPdf(){
        
    }
}
