/* eslint-disable @typescript-eslint/naming-convention */
import Button from 'components/Button';

interface LeftPanelProp {
    message: string
}

function LeftPanel({
    message
}: LeftPanelProp){
    return (
        <div className='panel-wrapper'>
            <span className='panel-info'>{message}</span>
           <Button></Button>
        </div>
    );
}

export default LeftPanel;