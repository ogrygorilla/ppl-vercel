/**
 * Show a loader indicator
 * @param {*} show
 * @returns
 */
export default function Loader({ show }) {
  return show ? <div className="loader"></div> : null;
}
