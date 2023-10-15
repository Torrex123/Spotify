import { Controller, Post, Res } from '@nestjs/common';
import { ApiService } from './api.service';


@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Post('\top10ArtistByTrackNumber')
    async top10ArtistByTrackNumber(@Res() res) {
        res.status(200).json({
            "position": 1,
            "tittle": "PADILLA VALE MONDA EN ESTA VERGA ECHE",
            "type": "Prostituta",
            "data": await this.apiService.getAlbumTypeDistribution()
        });
    }

    @Post('\scatterDanceabilityLoudness')
    async scatterDanceabilityLoudness(@Res() res) {
        res.status(200).json({
            "position": 2,
            "tittle": "PADILLA VALE MONDA EN ESTA VERGA ECHE",
            "type": "Prostituta",
            "data": await this.apiService.scatterDanceabilityLoudness()
        });
    }
}
