import Action, { IActionProps } from "./Action";

const Actions = ({ actions }: { actions: IActionProps[] }) => {
  return (
    <div className="actions">
      {actions.map((action, index) => (
        <Action
          key={index}
          onClick={action.onClick}
          icon={action.icon}
          highlight={action.highlight}
          title={action.title}
        />
      ))}
    </div>
  );
};

export default Actions;
