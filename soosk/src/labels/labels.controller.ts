import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LabelsService } from "./labels.service";
import { getUserId } from "src/utils";
import { IRequest } from "src/types";

interface AddLabelRequest {
  name: string;
  color: number;
}

@Controller("labels")
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Get()
  getLabels() {
    return this.labelsService.getLabels();
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  addLabel(@Body() reqBody: AddLabelRequest) {
    return this.labelsService
      .addLabels(reqBody.name, reqBody.color)
      .then((label) => ({
        id: label.id,
      }));
  }

  @Delete(":labelId")
  @UseGuards(AuthGuard("jwt"))
  deleteLabel(@Param("labelId") labelId: string) {
    return this.labelsService.deleteLabel(Number(labelId));
  }

  @Patch(":labelId")
  @UseGuards(AuthGuard("jwt"))
  updateLabel(
    @Param("labelId") labelId: string,
    @Body() reqBody: Partial<{ name: string; color: number }>,
    @Req() req: IRequest,
  ) {
    const userId = getUserId(req);
    return this.labelsService.updateLabel(userId!, Number(labelId), reqBody);
  }
}
