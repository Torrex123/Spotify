import { Controller, Post, Res } from '@nestjs/common';
import { ApiService } from './api.service';


@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Post('\top10ArtistByTrackNumber')
    async top10ArtistByTrackNumber(@Res() res) {
        res.status(200).json({
            "position": 1,
            "tittle": "Artist by Track Number",
            "type": "Bar",
            "dataset": await this.apiService.artistByTrackNumber
        });
    }

    @Post('\scatterDanceabilityLoudness')
    async scatterDanceabilityLoudness(@Res() res) {
        res.status(200).json({
            "position": 2,
            "tittle": "Loudness vs. Danceability",
            "type": "Scatter",
            "dataset": {
                "data": await this.apiService.scatterDanceabilityLoudness(),
                "description": "point" }
        });
    }

    @Post('\albumTypeDistribution')
    async albumTypeDistribution(@Res() res) {
        res.status(200).json({
            "position": 3,
            "tittle": "Album Type Distribution",
            "type": "Pie",
            "data": await this.apiService.getAlbumTypeDistribution()
        });
    }


}
