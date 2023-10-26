import './MindfulInstructions.css';
import { useHistory } from 'react-router-dom';

function MindfulInstructions() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/moments'); 
    }; 

    return (
        <>
        <h1>How To Practice Mindfulness With Moments App</h1>
        <br />
        <ol>
        <li><strong>Start with a Moment:</strong> To truly experience mindfulness, capture a special moment from your day. This could be a serene walk in the park, a calming cup of tea, or even a peaceful meditation session. The essence is to be present and truly savor that moment.</li>
        
        <li><strong>Reflect Regularly:</strong> Mindfulness thrives on self-reflection. Take a moment every now and then to reflect on your experiences. What did you learn? How did it make you feel? Capturing these reflections amplifies the benefits of mindfulness.</li>
        
        <li><strong>Add Photos:</strong> A picture is worth a thousand words. If you can, attach a photo that encapsulates the essence of your moment. Over time, this gallery will serve as a visual reminder of your mindfulness journey.</li>
        
        <li><strong>Review and Revisit:</strong> Periodically, revisit past moments and reflections. This practice not only allows you to see your progress but also helps reinforce the importance of being in the present.</li>
        
        <li><strong>Embrace the Journey:</strong> Mindfulness is not just a practice but a journey. There will be days when it feels natural and others when it's challenging. Embrace all aspects of this journey, and remember that every moment is an opportunity for mindfulness.</li>
        </ol>
        <br />
        <button onClick={handleClick}>Begin Your Mindfulness Journey</button>
        </>
    )
}

export default MindfulInstructions;
