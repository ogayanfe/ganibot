import SplineChart from "@/components/chart/spline";

export default function NewChat () {

    return (
        <div>
            <div>
                {/* Caption Icon */}
                <i> </i>
                {/* Audio Icon */}
                <i> </i>
                {/* Settings Icon */}
                <i> </i>
            </div>
            {/* 3d component */}
            <div>
                <SplineChart scene={'/scene.splinecode'} width="w-1/4" height="h-1/4" />
            </div>
            {/* Translation and Video Box */}
            <div>

            </div>
            <div>
                {/* Microphone icon */}
                <i></i>
                {/* Camera Icon */}
                <i></i>
                {/* Cancel Icon */}
                <i></i>
            </div>
        </div>
    )
}