import { SerializedUser } from "@redux/firebase/authSlice.ts";

export default interface ProfileProps {
    user?: SerializedUser | null;
}
