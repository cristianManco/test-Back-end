import { PartialType } from "@nestjs/mapped-types";
import { CreateResultDto } from "./createResult.dto";



export class UpdateMatchResultDto extends PartialType(CreateResultDto) {}
