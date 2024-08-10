
export const RightHero = ({
    artistProfilePicture,
    currentPage,
    heroImage,
}: {
    artistProfilePicture?: string;
    currentPage?: number;
    heroImage: string;
}) => {
    artistProfilePicture;
    currentPage;

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-start justify-start pb-0 bg-black">
            <div className="w-full h-full flex flex-col items-center justify-center max-w-screen-xl mx-auto">
                <div className="relative w-full flex flex-col items-center justify-center">
                    <div className="relative w-full flex justify-center items-center">
                        <img className="w-full h-full" src={heroImage} alt="" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                    </div>
                    {/* <ProfileComponent
                        ArtistProfile={artistProfilePicture}
                        ArtistName='Davido'
                        ArtistLabel='Afrobeats top musician'
                        description='Hi, folks! Onboarding flows are a way to introduce new users or current customers to a user interface or new feature'
                        page={currentPage}
                    /> */}
                </div>
            </div>
        </div>
    );
};
