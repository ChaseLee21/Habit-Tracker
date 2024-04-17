import withAuth from "./Hoc";

function ProtectedRoute({ component: Component }) {
    return withAuth(Component)();
}

export default ProtectedRoute;