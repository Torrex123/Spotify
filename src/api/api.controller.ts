import { Controller, Post, Res } from '@nestjs/common';
import { ApiService } from './api.service';


@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Post('\scatterDanceabilityLoudness')
    async scatterDanceabilityLoudness(@Res() res) {
        res.status(200).json({
            "position": 1,
            "title": "Loudness vs. Danceability",
            "type": "Scatter",
            "datasets":[await this.apiService.scatterDanceabilityLoudness()],
            "xlabel": "Danceability",
            "ylabel": "Loudness"
        });
    }

    @Post('\albumTypeDistribution')
    async albumTypeDistribution(@Res() res) {
        res.status(200).json({
            "position": 2,
            "title": "Album Type Distribution",
            "type": "Pie",
            "data": await this.apiService.getAlbumTypeDistribution(),
            "xlabel": "album type",
            "ylabel": "count"
        });
    }

    @Post('\artistByTrackNumber')
    async artistByTrackNumber(@Res() res) {
        res.status(200).json({
            "position": 3,
            "title": "Artist by Track Number",
            "type": "Bar",
            "dataset": await this.apiService.totalTracksByArtistName(),
            "xlabel": "Artist",
            "ylabel": "total tracks"
        });
    }

    @Post('\a')
    async tracksThroughTime(@Res() res) {
        res.status(200).json({
            "position": 4,
            "title": "Number of Tracks Over Time",
            "type": "Line",
            "dataset": await this.apiService.numberOfTracksOverTime(),
            "xlabel": "Year",
            "ylabel": "Count"
        });
    }

   
}
