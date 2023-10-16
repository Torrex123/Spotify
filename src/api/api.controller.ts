import { Controller, Post, Res, Get, Query, Param} from '@nestjs/common';
import { ApiService } from './api.service';


@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Get('scatterDanceabilityLoudness')
    async scatterDanceabilityLoudness(@Res() res) {
        res.status(200).json({
            "position": 1,
            "title": "Loudness vs. Danceability",
            "type": "Scatter",
            "datasets":[await this.apiService.top10ArtistsByTrackNumber()],
            "xlabel": "Danceability",
            "ylabel": "Loudness"
        });
    }

    @Get('albumTypeDistribution')
    async albumTypeDistribution(
        @Query('artist') artist: string,
        @Query ('top') top: number,
        @Query ('date') date: string,
        @Res() res,
    ) {
        res.status(200).json({
            "position": 2,
            "title": "Album Type Distribution",
            "type": "Pie",
            "data": await this.apiService.getAlbumTypeDistribution(artist, top, date),
            "xlabel": "album type",
            "ylabel": "count"
        });
    }

    @Get('artistByTrackNumber')
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

    @Get('tracksThroughTime')
    async tracksThroughTime(
        @Query('artist') artist: string,
        @Query ('top') top: number,
        @Query ('date') date: string,
        @Res() res) {
        res.status(200).json({
            "position": 4,
            "title": "Number of Tracks Over Time",
            "type": "Line",
            "dataset": await this.apiService.numberOfTracksOverTime(artist, top, date),
            "xlabel": "Year",
            "ylabel": "Count"
        });
    }  
}
